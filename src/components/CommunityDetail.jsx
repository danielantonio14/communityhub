import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function CommunityDetail() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const docRef = doc(db, 'communities', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCommunity({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('Comunidade não encontrada');
        }
      } catch (error) {
        console.error('Erro ao buscar comunidade:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunity();
  }, [id]);

  const mockMembers = [
    { id: 1, name: 'João Silva', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Maria Oliveira', avatar: 'https://via.placeholder.com/50' },
  ];

  if (loading) return <div className="text-center py-10">Carregando...</div>;
  if (!community) return <div className="text-center py-10">Comunidade não encontrada</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{community.name}</h1>
      <img
        src="https://via.placeholder.com/300"
        alt="Community"
        className="w-full max-w-md h-48 object-cover rounded mb-4"
      />
      <p className="text-gray-600 mb-6">{community.description}</p>
      <button
        onClick={() => setIsMember(!isMember)}
        className={`px-4 py-2 rounded ${
          isMember ? 'bg-red-500' : 'bg-green-500'
        } text-white hover:opacity-90`}
      >
        {isMember ? 'Sair' : 'Participar'}
      </button>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Membros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockMembers.map(member => (
          <div key={member.id} className="flex items-center p-2 border rounded">
            <img src={member.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
            <span>{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}