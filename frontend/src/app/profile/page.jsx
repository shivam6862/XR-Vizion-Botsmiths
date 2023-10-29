import ProfileTemplate from "@/components/profile/ProfileTemplate";
import UserProfileInput from "@/components/profile/UserProfileInput";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Profile = () => {
  return (
    <>
      <Header />
      <ProfileTemplate title="Edit Profile">
        <UserProfileInput />
      </ProfileTemplate>
      <Footer />
    </>
  );
};

export default Profile;
