import { useEffect, useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import styles from "./style/structure.module.css";
import Card from "@/Components/Card/Card";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import AxiosInstance from "@/Helpers/Axios";
import image from "/public/Images/ceo1.jpeg";
import { Avatar } from "@mui/material";
import HrImage from "/public/Images/Hr.jpeg";

interface ProjectData {
  _id: string;
  projectManager: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  teamMembers: Array<{
    _id: string;
    firstName: string;
    lastName: string;
  }>;
}

interface CustomTreeNode extends TreeNode {
  type?: string;
  data: {
    name?: string;
    title?: string;
    teamMembers?: Array<{ firstName: string; lastName: string }>;
    image?: string;
  };
  children?: CustomTreeNode[];
}

export default function ColoredDemo() {
  const [data, setData] = useState<CustomTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get<ProjectData[]>("/project/structure")
      .then((response) => {
        console.log("API Response:", response.data);
        const transformedData = transformProjectData(response.data);
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch projects. Please try again later.");
        setLoading(false);
      });
  }, []);

  const transformProjectData = (projects: ProjectData[]): CustomTreeNode[] => {
    const rootNode: CustomTreeNode = {
      expanded: true,
      type: "person",
      className: styles.bgIndigo500,
      data: {
        name: "Pasho Toska",
        image: image,
        title: "CEO",
      },
      children: [
        {
          expanded: true,
          type: "person",
          className: styles.bgPurple500,
          data: {
            name: "Elisabeta Guri",
            image: HrImage,
            title: "HR",
          },
        },
        {
          expanded: true,
          type: "person",
          className: styles.bgTeal500,
          data: {
            name: "Project Managers",
            title: "Department",
          },
          children: projects.map((project) => ({
            expanded: true,
            type: "person",
            className: styles.bgPurple500,
            data: {
              name: `${project.projectManager.firstName} ${project.projectManager.lastName}`,
              title: "Project Manager",
              teamMembers: project.teamMembers,
            },
            children: [
              {
                expanded: true,
                type: "team",
                className: styles.bgTeal500,
                data: {
                  teamMembers: project.teamMembers,
                },
              },
            ],
          })),
        },
      ],
    };

    return [rootNode];
  };

  const nodeTemplate = (node: CustomTreeNode) => {
    if (node.type === "person") {
      return (
        <div className={styles.flexColumn}>
          <div className={`${styles.flexColumn} ${styles.alignItemsCenter}`}>
            {node.data.image && (
              <Avatar
                src={node.data.image}
                alt={node.data.name}
                sx={{ width: 40, height: 40, mb: 1 }}
              />
            )}
            <span className={styles.nodeName}>{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    } else if (node.type === "team") {
      return (
        <div className={styles.flexColumn}>
          <div className={styles.alignItemsCenter}>
            <strong>Team Members:</strong>
            <ul className={styles.verticalList}>
              {node.data.teamMembers?.map((member, index) => (
                <li key={index}>{`${member.firstName} ${member.lastName}`}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return node.label;
  };

  return (
    <Card border="1px solid #ebebeb" borderRadius="5px" height="100%">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={styles.organizationChart}>
          <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
        </div>
      )}
    </Card>
  );
}
