import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import CommunityCard from './CommunityCard';
import { Link } from 'react-router-dom';

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'communities'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCommunities(data);
      } catch (error) {
        console.error('Erro ao buscar comunidades:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  if (loading) return <div className="text-center py-10">Carregando...</div>;

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
        {communities.map(community => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}