import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ClientDashboard() {
  const { token, user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/documents/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDocuments(response.data);
      } catch (err) {
        alert('Erro ao carregar documentos');
      } finally {
        setLoading(false);
      }
    };

    if (token && user) {
      fetchDocuments();
    }
  }, [token, user]);

  if (loading) return <p>Carregando documentos...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Bem-vindo, {user.name}</h2>
      <h3>Seus documentos</h3>
      {documents.length === 0 ? (
        <p>Você não possui documentos cadastrados.</p>
      ) : (
        <ul>
          {documents.map(doc => (
            <li key={doc.id}>
              <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                {doc.file_name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientDashboard;
