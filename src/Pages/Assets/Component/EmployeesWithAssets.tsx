import { useContext } from "react";
import { useGetUsersWithAssets as useData } from "../Hook/index";
import { AssetsContext } from "../AssetsContext";
import { CircularProgress } from "@mui/material";
import { UserWithAsset } from "../TAsset";
import Card from "@/Components/Card/Card";
import style from "../style/employeesWithAssets.module.scss";

export const EmployeesWithAssets = () => {
  const { usersWithAssets, searchParams } = useContext(AssetsContext);

  const { error, loading } = useData(searchParams);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <CircularProgress />;

  console.log(usersWithAssets);
  const users = usersWithAssets.map((user: UserWithAsset) => (
    <Card key={user._id} className={style.userDiv}>
      <img src={user.imageUrl} style={{}} />
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
      </div>
    </Card>
  ));
  return <div className={style.mainContainer}>{users}</div>;
};
