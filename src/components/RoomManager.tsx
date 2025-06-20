import React, { useState } from 'react';
import { Users, Share2, Lock, Unlock, Copy, Check } from 'lucide-react';
import { Room, User } from '../types/whiteboard';

interface RoomManagerProps {
  currentRoom: Room | null;
  users: User[];
  onCreateRoom: (name: string, isPrivate: boolean) => void;
  onJoinRoom: (roomId: string) => void;
  onLeaveRoom: () => void;
}

export const RoomManager: React.FC<RoomManagerProps> = ({
  currentRoom,
  users,
  onCreateRoom,
  onJoinRoom,
  onLeaveRoom
}) => {
  const [showRoomDialog, setShowRoomDialog] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState('');
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      onCreateRoom(roomName.trim(), isPrivate);
      setRoomName('');
      setIsPrivate(false);
      setShowRoomDialog(false);
    }
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim()) {
      onJoinRoom(joinRoomId.trim());
      setJoinRoomId('');
      setShowJoinDialog(false);
    }
  };

  const copyRoomLink = async () => {
    if (currentRoom) {
      const link = `${window.location.origin}?room=${currentRoom.id}`;
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 space-y-4 min-w-64">
        {/* Room Info */}
        {currentRoom ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{currentRoom.name}</h3>
              <div className="flex items-center space-x-2">
                {currentRoom.isPrivate ? (
                  <Lock size={16} className="text-gray-500" />
                ) : (
                  <Unlock size={16} className="text-gray-500" />
                )}
                <button
                  onClick={copyRoomLink}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Copy room link"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Room ID: {currentRoom.id}
            </div>
            
            <button
              onClick={onLeaveRoom}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Leave Room
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">No Room Joined</h3>
            <div className="space-y-2">
              <button
                onClick={() => setShowRoomDialog(true)}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Create Room
              </button>
              <button
                onClick={() => setShowJoinDialog(true)}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Join Room
              </button>
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-gray-500" />
            <h4 className="text-sm font-medium text-gray-700">
              Users ({users.length})
            </h4>
          </div>
          
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: user.color }}
                />
                <span className="text-sm text-gray-700">{user.name}</span>
                {user.isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Room Dialog */}
      {showRoomDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room name"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="private" className="text-sm text-gray-700">
                  Private room
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRoomDialog(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Room Dialog */}
      {showJoinDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Join Room</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room ID or Link
                </label>
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room ID or paste link"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowJoinDialog(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinRoom}
                className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};