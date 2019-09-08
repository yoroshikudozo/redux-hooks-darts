import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dartsboard } from 'components/atoms/DartsBoard';

const Home: React.FC<RouteComponentProps<{}>> = _ => {
  const handleClick = ({ currentTarget }: React.MouseEvent<SVGElement>) => {
    console.log(currentTarget.dataset.value);
    console.log(currentTarget.dataset.area);
    console.log(currentTarget.dataset.type);
  };
  return (
    <div>
      <div>Home</div>
      <Dartsboard onBoardClick={handleClick} isFinished={false} />
    </div>
  );
};

export default Home;
