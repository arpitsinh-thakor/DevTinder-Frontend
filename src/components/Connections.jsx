"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data?.connections || []));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
      setError("Could not load connections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 text-lg">Loading connections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!connections?.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 text-lg">No connections found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-base-200 min-h-screen">
      <h1 className="text-4xl font-semibold text-primary mb-6">Connections</h1>
      <div className="w-1/3 max-w-2xl space-y-4 px-4">
        {connections.map((connection) => (
          <div
            key={connection._id || connection.email}
            className="flex flex-row items-center justify-between bg-base-100 rounded-xl shadow p-6"
          >
                <div>
                        <img
                            className="h-20 w-20 rounded-full object-cover mb-4"
                            src={connection.photoUrl}
                            alt={`${connection.firstName} ${connection.lastName}`}
                            />
                            <h2 className="text-xl font-medium text-center">
                            {connection.firstName} {connection.lastName}
                            </h2>
                            <p className="text-gray-600 text-center">{connection.about}</p>
                </div>
                <div>
                    <Link to={`/chat/${connection._id}` } className="btn btn-primary">
                        Chat
                    </Link>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
