import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

interface Props {
  onSelectHeart: () => void;
}

export const Like = ({ onSelectHeart }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onSelectHeart();
  };

  if (!status) return <AiOutlineHeart onClick={() => { toggle() }} color="pink" size="20"/>
    return <AiFillHeart onClick={() => { toggle() }} color="pink" size="20"/>
   
};
