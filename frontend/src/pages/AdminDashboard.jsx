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

      const clients = response.data.client;
      const credentials = response.data.userCredentials;

      alert(
        `Cliente cadastrado com sucesso!\n\nCredenciais de acesso:\nLogin: ${credentials.email}\nSenha: ${credentials.password}`
      );

      setNewClient({ name: "", cnpj: "", email: "", phone: "" });
      fetchClients();
    } catch (err) {
      alert("Erro ao cadastrar cliente");
    }
  };

  const handleUploadFile = async (clientId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '*/*';
  
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('clientId', clientId);
  
      try {
        await api.post('/documents/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        });
  
        alert('Arquivo enviado com sucesso!');
      } catch (error) {
        alert('Erro ao enviar arquivo');
      }
    };
  
    fileInput.click();
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

  const handleDeleteDocument = async (docId) => {
    if (!window.confirm("Deseja realmente excluir este documento?")) return;
  
    try {
      await api.delete(`/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Documento excluído com sucesso!");
      // Recarregar os documentos
      const client = clients.find(c => c.name === selectedClientName);
      if (client) fetchClientDocuments(client.id, client.name);
    } catch (err) {
      alert("Erro ao excluir documento.");
    }
  };
  
  const handleUpdateDocument = async (docId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '*/*';
  
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        await api.put(`/documents/update/${docId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });
        alert("Documento atualizado com sucesso!");
        const client = clients.find(c => c.name === selectedClientName);
        if (client) fetchClientDocuments(client.id, client.name);
      } catch {
        alert("Erro ao atualizar documento.");
      }
    };
  
    fileInput.click();
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
      <td data-label="Ações" className="label-btns">
        <button
          onClick={() => fetchClientDocuments(client.id, client.name)}
          className="btn btn-secondary"
        >
          Ver Documentos
        </button>
        <button
          onClick={() => handleUploadFile(client.id)}
          className="btn btn-upload"
        >
          Upload
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
    selectedClientDocuments.map((doc) => {
      const isPDF = doc.file_name.toLowerCase().endsWith(".pdf");
      const uploadedAt = new Date(doc.uploaded_at).toLocaleString("pt-BR");

      return (
        <li key={doc.id} className="document-item">
          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="document-link"
          >
            {isPDF ? (
              <span role="img" aria-label="PDF">📄</span>
            ) : (
              <span role="img" aria-label="Arquivo">📁</span>
            )}
            <span className="file-name">{doc.file_name}</span>
          </a>
          <div className="uploaded-at">Anexado em: {uploadedAt}</div>
          <div className="document-actions">
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteDocument(doc.id)}
          >
            Excluir
          </button>
          <button
            className="btn btn-upload"
            onClick={() => handleUpdateDocument(doc.id)}
          >
            Atualizar
          </button>
        </div>
        </li>
      );
    })
  )}
</ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
