import { useContext } from "react";
import { useGetUsersWithAssets as useData } from "../Hook";
import { AssetsContext } from "../AssetsContext";
import { CircularProgress } from "@mui/material";
import { UserWithAsset, Asset } from "../TAsset";
import Card from "@/Components/Card/Card";
import style from "../style/employeesWithAssets.module.css";

export const EmployeesWithAssets = () => {
  const { error, loading } = useData();
  const { usersWithAssets } = useContext(AssetsContext);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <CircularProgress />;

  console.log(usersWithAssets);
  const users = usersWithAssets.map((user: UserWithAsset) => (
    <Card key={user._id} className={style.userDiv}>
      <img
        src={user.imageUrl}
        style={{
          width: "6rem",
          height: "6rem",
          objectFit: "cover",
          borderRadius: "1rem",
        }}
      />
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <ul>
        {user.assets.map((asset: Asset) => (
          <li key={asset._id}>{asset.type}</li>
        ))}
      </ul>
    </Card>
  ));
  return <div className={style.mainContainer}>{users}</div>;
};
