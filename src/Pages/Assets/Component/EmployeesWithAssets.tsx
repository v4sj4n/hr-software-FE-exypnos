import { useContext } from "react";
import { useGetUsersWithAssets as useData } from "../Hook/index";
import { AssetsContext } from "../AssetsContext";
import { CircularProgress } from "@mui/material";
import { UserWithAsset, Asset } from "../TAsset";
import Card from "@/Components/Card/Card";
import style from "../style/employeesWithAssets.module.css";
import { Laptop } from "@mui/icons-material";

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

      <ul
        style={{
          display: "flex",
          position: "relative",
          bottom: "10px",
          gap: "0.25rem",
        }}
      >
        {user.assets.map((asset: Asset) => (
          <li
            key={asset._id}
            style={{
              display: "absolute",
              backgroundColor: "lightblue",

              borderRadius: "99px",
              padding: "0.1rem",
              top: "-20",
              marginTop: "0",

              marginLeft: "-0.5rem",

              left: 0,
            }}
          >
            {
              <Laptop
                sx={{
                  width: "10px",
                  height: "10px",
                }}
              />
            }
          </li>
        ))}
      </ul>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
    </Card>
  ));
  return <div className={style.mainContainer}>{users}</div>;
};
