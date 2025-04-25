import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import CommunityCard from './CommunityCard';
import { Link } from 'react-router-dom';

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'communities'),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCommunities(data);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao buscar comunidades:', error.message);
        setError(`Erro: ${error.message}`);
      }
    );
    return () => unsubscribe(); // Limpa o listener ao desmontar
  }, []);

  if (loading) return <div className="text-center py-10">Carregando...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CommunityHub</h1>
      <Link
        to="/communities/new"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block"
      >
        Criar Nova Comunidade
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.length > 0 ? (
          communities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))
        ) : (
          <p className="text-gray-600">Nenhuma comunidade encontrada.</p>
        )}
      </div>
    </div>
  );
}