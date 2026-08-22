"use client";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const CreateUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      // Save New User if Not Exist
      const result = await CreateUser({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl,
        name: user?.fullName ?? "",
      });
      setUserDetail(result);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};
