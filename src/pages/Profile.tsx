import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type StudentProfile = {
  username: string;
  email: string;
  birthYear: number;
  educationLevel: string;
  academicPerformance: string;
  avatarUrl?: string;
  lastUpdatedAt: string;
};

type ProfileResponse = {
  success: boolean;
  profile: StudentProfile;
  message?: string;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [error, setError] = useState("");
  const [canUpdate, setCanUpdate] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem hồ sơ.");
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data: ProfileResponse = await res.json();
        if (res.ok) {
          setProfile(data.profile);
          checkCanUpdate(data.profile.lastUpdatedAt);
        } else {
          setError(data.message || "Không thể tải hồ sơ.");
        }
      } catch (err) {
        console.error("Lỗi mạng:", err);
        setError("Lỗi mạng. Vui lòng thử lại.");
      }
    };
    fetchProfile();
  }, []);

  const checkCanUpdate = (lastUpdatedAt: string) => {
    const lastUpdate = new Date(lastUpdatedAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    setCanUpdate(diffDays >= 3);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    alert("Đã chọn ảnh. Chức năng upload cần API.");
  };

  const handleUpdateProfile = async () => {
    if (!canUpdate) {
      alert("Bạn chỉ được cập nhật thông tin sau 3 ngày kể từ lần cập nhật trước.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || !profile) return;

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          birthYear: profile.birthYear,
          educationLevel: profile.educationLevel,
          academicPerformance: profile.academicPerformance
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        const now = new Date().toISOString();
        setProfile({ ...profile, lastUpdatedAt: now });
        checkCanUpdate(now);
      } else {
        alert(data.message || "Cập nhật thất bại");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Lỗi mạng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-valky text-accent mb-4">Hồ sơ học sinh</h1>

      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
          <button
            onClick={goToLogin}
            className="mt-2 text-white bg-accent px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Đăng nhập ngay
          </button>
        </div>
      )}

      {profile && (
        <div className="card">
          <img
            src={avatarPreview || profile.avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
          />

          <div className="text-center">
            <h2 className="font-bold text-lg">{profile.username}</h2>
            <p className="text-sm text-gray-500">Học sinh hệ thống Trạng Nguyên</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Năm sinh:</strong> {profile.birthYear}</p>
            <p><strong>Học vấn:</strong> {profile.educationLevel}</p>
            <p><strong>Học lực:</strong> {profile.academicPerformance}</p>
            <p><strong>Lần cập nhật cuối:</strong> {new Date(profile.lastUpdatedAt).toLocaleDateString()}</p>

            <div className="mt-4 flex flex-col gap-2">
              <label className="cursor-pointer inline-block text-accent underline">
                Chọn ảnh đại diện
                <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
              </label>
              <button
                onClick={handleUpdateProfile}
                className="bg-accent text-white rounded py-2 hover:bg-purple-600 transition"
              >
                Cập nhật thông tin
              </button>
              <button
                onClick={logout}
                className="mt-auto text-sm text-red-400 hover:underline"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
