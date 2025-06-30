import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

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

  const navigate = useNavigate(); // Vẫn dùng theme nếu cần cho logic khác (hoặc bỏ nếu không dùng)

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
      } catch {
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
    } catch {
      alert("Lỗi mạng. Vui lòng thử lại.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/app/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition">
      <Card className="max-w-lg w-full bg-card text-card-foreground border border-border shadow">
        <CardHeader>
          <CardTitle>Hồ sơ học sinh</CardTitle>
          <CardDescription>
            Quản lý thông tin cá nhân của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500 mb-4">
              <p>{error}</p>
              <button
                onClick={() => navigate("/app/login")}
                className="mt-2 bg-primary text-primary-foreground py-2 px-4 rounded"
              >
                Đăng nhập ngay
              </button>
            </div>
          ) : profile && (
            <>
              <div className="flex justify-center mb-4">
                <img
                  src={avatarPreview || profile.avatarUrl || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <p><strong>Tên:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Năm sinh:</strong> {profile.birthYear}</p>
                <p><strong>Học vấn:</strong> {profile.educationLevel}</p>
                <p><strong>Học lực:</strong> {profile.academicPerformance}</p>
                <p><strong>Cập nhật cuối:</strong> {new Date(profile.lastUpdatedAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 space-y-2">
                <label className="cursor-pointer inline-block text-primary underline">
                  Chọn ảnh đại diện
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
                </label>
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-primary text-primary-foreground py-2 rounded"
                >
                  Cập nhật thông tin
                </button>
                <button
                  onClick={logout}
                  className="w-full text-red-500 hover:underline text-sm"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
