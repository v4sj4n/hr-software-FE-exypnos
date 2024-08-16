import Button from "@/Components/Button/Button";
import { ButtonTypes } from "@/Components/Button/ButtonTypes";
import AxiosInstance from "@/Helpers/Axios";
import { useState,  FormEvent } from "react";
import { Laptop, Monitor } from "@mui/icons-material";


interface UpdateAssetProps {
  type: string;
  id: string;
  user?: User | null;
  status: string;
  handleCloseModal: () => void;
  cancelEdit: () => void;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

export const UpdateAssetForm: React.FC<UpdateAssetProps> = ({
  id,
  type,
  status,
  user,
  handleCloseModal,
  cancelEdit,
}) => {
  const [userId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload =
        status === "available"
          ? {
              userId: userId,
              status: "assigned",
            }
          : {
              status: "available",
              userId: null,
            };
      const res = await AxiosInstance.patch(`asset/${id}`, payload);

      if (res.status === 200) {
        handleCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);

  return (
    <div>
      <h2
        style={{
          color: "#333",
          fontSize: "1.75rem",
          fontWeight: 700,
        }}
      >
        Update Asset
      </h2>
      {status == "available" ? (
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "",
                gap: "0.5rem",
                color: "#333",
                fontSize: "1.75rem",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              {type === "monitor" ? <Monitor /> : <Laptop />}{" "}
              {type[0].toUpperCase() + type.slice(1)}
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5rem",
            }}
          >
            <Button
              btnText={"Cancel"}
              type={ButtonTypes.SECONDARY}
              border={"none"}
              padding="0.5rem 1rem"
              fontWeight={600}
              onClick={cancelEdit}
            />
            <Button
              btnText={"Update"}
              type={ButtonTypes.PRIMARY}
              fontWeight={600}
              isSubmit
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "",
              gap: "0.25rem",
              color: "#333",
              fontSize: "1.25rem",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            {type === "monitor" ? <Monitor /> : <Laptop />}{" "}
            {type[0].toUpperCase() + type.slice(1)}
          </h3>
          <p>
            Assigned to: {user?.firstName} {user?.lastName}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5rem",
            }}
          >
            <Button
              btnText={"Cancel"}
              type={ButtonTypes.SECONDARY}
              border={"none"}
              padding="0.5rem 1rem"
              fontWeight={600}
              onClick={cancelEdit}
            />
            <Button
              btnText={"Remove Asset from User"}
              type={ButtonTypes.PRIMARY}
              backgroundColor="red"
              fontWeight={700}
              marginTop={"0.5rem"}
              border={`1px solid red`}
              isSubmit
            />
          </div>
        </form>
      )}
    </div>
  );
};
