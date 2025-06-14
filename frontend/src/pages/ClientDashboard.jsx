import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LadingPage from '../pages/LandingPage';
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import '../style/clientDashboard.css';

const ClientDashboard = () => {
  const { token, user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [searchTitle, setSearchTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get('/documents/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDocuments(response.data);
        console.log("documentos aqui:", documents)
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

  const hasActiveFilters = searchTitle || startDate || endDate;

const filteredDocs = hasActiveFilters
  ? documents.filter((doc) => {
      const title = doc.file_name || 'sem título';
      const matchesTitle = title.toLowerCase().includes(searchTitle.toLowerCase());

      const uploaded = new Date(doc.uploaded_at);

      const afterStart = startDate ? uploaded >= new Date(startDate) : true;

      const end = endDate
        ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
        : true;

      const beforeEnd = endDate ? uploaded <= end : true;

      return matchesTitle && afterStart && beforeEnd;
    })
  : documents;

  // função para limpar filtros
  const clearFilters = () => {
    setSearchTitle('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="dashboard">
      <h1>Seus Documentos</h1>
      <p>Visualize e baixe os arquivos enviados pela equipe administrativa</p>
      
      <div className="grid-documentos">

        <div className="card-total-arquivos">
          Total de arquivos 
           <h3>{filteredDocs.length}</h3>
        </div>
        <Link to="/" className="goBack">Voltar</Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {hasActiveFilters && (
          <button className="clear-button" onClick={clearFilters}>
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="documents">
        {filteredDocs.length === 0 ? (
          <p>Nenhum documento encontrado com os filtros aplicados.</p>
        ) : (
          filteredDocs.map((doc) => (
      
            <div className="doc-card" key={doc.id}>
               <>
             { console.log("doc filtrado aqui",filteredDocs) }
            </>
              <h2>{doc.title || doc.file_name }</h2>
              <p><strong>Enviado em:</strong> {new Date(doc.uploaded_at).toLocaleString('pt-BR')}</p>
              <a href={doc.secure_url} target="_blank" rel="noopener noreferrer">
                📂 Visualizar Documento
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
