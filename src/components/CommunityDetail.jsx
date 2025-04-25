import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc,  collection, addDoc, deleteDoc, query, where, onSnapshot, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function CommunityDetail() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const userId = 'user1'; // Placeholder for user

  useEffect(() => {
    // Fetch community data
    const unsubscribeCommunity = onSnapshot(
      doc(db, 'communities', id),
      (docSnap) => {
        if (docSnap.exists()) {
          setCommunity({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Community not found');
        }
      },
      (error) => {
        setError(`Error: ${error.message}`);
      }
    );

    // Fetch members
    const unsubscribeMembers = onSnapshot(
      query(collection(db, 'memberships'), where('communityId', '==', id)),
      (snapshot) => {
        const memberData = snapshot.docs.map(doc => doc.data().userId);
        setMembers(memberData);
        setIsMember(memberData.includes(userId));
        setLoading(false);
      },
      (error) => {
        setError(`Error: ${error.message}`);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeCommunity();
      unsubscribeMembers();
    };
  }, [id]);

  const handleJoinLeave = async () => {
    setLoading(true);
    try {
      if (isMember) {
        // Leave: remove membership document
        const q = query(
          collection(db, 'memberships'),
          where('userId', '==', userId),
          where('communityId', '==', id)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError('Membership not found');
          setLoading(false);
          return;
        }
        // Delete each matching document (should be only one)
        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
      } else {
        // Join: add membership document
        await addDoc(collection(db, 'memberships'), {
          userId,
          communityId: id,
          joinedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error updating membership:', error.message);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!community) return <div className="text-center py-10">Community not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{community.name}</h1>
      <p className="text-gray-600 mb-4">{community.description || 'No description'}</p>
      <p className="mb-4">
        <strong>Membros:</strong> {members.length}
      </p>
      <div className="mb-4">
        <strong>Lista de Membros:</strong>
        {members.length > 0 ? (
          <ul className="list-disc pl-5">
            {members.map(member => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        ) : (
          <p>Sem membro.</p>
        )}
      </div>
      <button
        onClick={handleJoinLeave}
        className={`px-4 py-2 rounded text-white ${
          isMember ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Processing...' : isMember ? 'Sair' : 'Entrar'}
      </button>
    </div>
  );
}