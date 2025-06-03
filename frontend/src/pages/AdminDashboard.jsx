import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import '../style/adminDashboard.css'

function AdminDashboard() {
  const { token, user } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newClient, setNewClient] = useState({ name: "", cnpj: "", email: "", phone: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientDocuments, setSelectedClientDocuments] = useState([]);
  const [selectedClientName, setSelectedClientName] = useState("");

  const fetchClients = async () => {
    try {
      const response = await api.get("/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    } catch {
      alert("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchClients();
    }
  }, [token, user]);

  const fetchClientDocuments = async (clientId, clientName) => {
    try {
      const response = await api.get(`/documents/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedClientDocuments(response.data);
      setSelectedClientName(clientName);
      setModalOpen(true);
    } catch {
      alert("Erro ao buscar documentos do cliente");
    }
  };

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = async (e) => {
    e.preventDefault();

    const generatedPassword = Math.random().toString(36).slice(-8);

    try {
      const response = await api.post(
        "/clients",
        { ...newClient, password: generatedPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const client = response.data;

      alert(
        `Cliente cadastrado com sucesso!\n\nCredenciais de acesso:\nLogin: ${client.email}\nSenha: ${generatedPassword}`
      );

      setNewClient({ name: "", cnpj: "", email: "", phone: "" });
      fetchClients();
    } catch (err) {
      alert("Erro ao cadastrar cliente");
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      await api.delete(`/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cliente excluído com sucesso!");
      fetchClients();
    } catch {
      alert("Erro ao excluir cliente");
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalOpen]);

  if (loading) return <p className="loading">Carregando clientes...</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Painel do Administrador</h2>

      <form onSubmit={handleAddClient} className="client-form">
        <h3>Novo Cliente</h3>
        <input
          name="name"
          placeholder="Nome"
          value={newClient.name}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          name="cnpj"
          placeholder="CNPJ"
          value={newClient.cnpj}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          name="email"
          placeholder="Email"
          value={newClient.email}
          onChange={handleInputChange}
          required
          className="input-field"
          type="email"
        />
        <input
          name="phone"
          placeholder="Telefone"
          value={newClient.phone}
          onChange={handleInputChange}
          required
          className="input-field"
          type="tel"
        />
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
  {clients.map((client) => (
    <tr key={client.id}>
      <td data-label="Nome">{client.name}</td>
      <td data-label="CNPJ">{client.cnpj}</td>
      <td data-label="Email">{client.email}</td>
      <td data-label="Ações">
        <button
          onClick={() => fetchClientDocuments(client.id, client.name)}
          className="btn btn-secondary"
        >
          Ver Documentos
        </button>
        <button
          onClick={() => handleDeleteClient(client.id)}
          className="btn btn-danger"
        >
          Excluir
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h3 id="modal-title">Documentos de {selectedClientName}</h3>
            <button
              className="btn btn-close"
              onClick={() => setModalOpen(false)}
              autoFocus
            >
              Fechar
            </button>
            <ul className="documents-list">
              {selectedClientDocuments.length === 0 ? (
                <li>Sem documentos encontrados.</li>
              ) : (
                selectedClientDocuments.map((doc) => (
                  <li key={doc.id}>
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                      {doc.file_name}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
