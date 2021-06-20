import React, { useState } from 'react';
import StageOne from './StageOne';
import StageTwo from './StageTwo';
import CentredContainer from '../../components/CentredContainer/CentredContainer';
import './LogIn.css';

const LogIn = () => {
  const [stage, setStage] = useState(1);

  return (
    <CentredContainer>
      {stage === 1 ? <StageOne setStage={setStage} /> : <StageTwo setStage={setStage} />}
    </CentredContainer>
  );
};

export default LogIn;
