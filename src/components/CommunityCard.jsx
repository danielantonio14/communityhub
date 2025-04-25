import { Link } from 'react-router-dom';

export default function CommunityCard({ community }) {
  return (
    <Link
      to={`/communities/${community.id}`}
      className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition"
    >
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/free-cdn-icon-download-in-svg-png-gif-file-formats--content-delivery-network-global-whcompare-blue-green-web-hosting-pack-communication-icons-1496574.png?f=webp&w=256"
        alt="Community"
        className="w-full h-32 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold">{community.name}</h2>
      <p className="text-gray-600">{community.description.slice(0, 100)}...</p>
    </Link>
  );
}