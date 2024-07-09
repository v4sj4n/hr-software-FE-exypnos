import React, {ReactNode} from "react";
import style from './Crad.module.css'

interface CardProps {
    children: ReactNode;
  }

const Card: React.FC<CardProps> = ({ children })  => {
  return <div className={style.card}>{children}</div>;
};

export default Card;