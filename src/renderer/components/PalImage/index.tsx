import "./index.css";

export interface IPalImageProps {
  index: number;
  className?: string;
}

export const PalImage = function PalImage_(props: IPalImageProps) {
  const { index, className = "" } = props;

  const imageName = `./img/pl/img${Math.ceil(index / 50)}.png`;

  const rIndex = (index - 1) % 50;

  let left = (rIndex % 10) * 64;
  let top = Math.floor(rIndex / 10) * 64;

  return (
    <div
      className={`c-pal-image ${className}`}
      style={{
        backgroundImage: `url(${imageName})`,
        backgroundPositionX: `-${left}px`,
        backgroundPositionY: `-${top}px`,
      }}
    ></div>
  );
};
