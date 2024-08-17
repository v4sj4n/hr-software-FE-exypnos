import style from "./statusBadge.module.scss";

export const StatusBadge = ({
  status,
  color,
}: {
  status: string;
  color: string;
}) => {
  switch (color) {
    case "red":
      return <span className={style.redBadge}>● {status}</span>;
    case "green":
      return <span className={style.greenBadge}>● {status}</span>;
    case "gray":
    case "grey":
      return <span className={style.grayBadge}>● {status}</span>;
    case "orange":
      return <span className={style.orangeBadge}>● {status}</span>;
    default:
      return <span className={style.blueBadge}>● {status}</span>;
  }
};
