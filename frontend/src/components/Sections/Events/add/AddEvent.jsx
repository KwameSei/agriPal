import React, { useEffect, useState } from 'react';
import { useValue } from '../../../../stateManagement/context/ContextProvider';
import { Button, Container, Stack, Step, StepButton, Stepper } from "@mui/material";
import { Box } from '@mui/system';
import AddDetails from '../add/AddDetails';
import AddImage from '../Images/AddImages';
import AddLocation from '../add/AddLocation';
import AddPayment from '../add/AddPayment';
import ReviewEvent from '../add/ReviewEvent';

const AddEvent = () => {
  const {state:{images}} = useValue()
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    // {label: 'Event Details', completed: false, content: <EventDetails />},
    // {label: 'Event Location', completed: false, content: <EventLocation />},
    // {label: 'Event Image', completed: false, content: <EventImage />},
    // {label: 'Event Payment', completed: false, content: <EventPayment />},
    // {label: 'Review Event', completed: false, content: <ReviewEvent />},

    {label: 'location', completed: false},
    {label: 'Details', completed: false},
    {label: 'Image', completed: false},
    {label: 'Payment', completed: false},
    {label: 'Review', completed: false},
  ]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep => activeStep + 1);
    } else {
      const index = findUnfinishedStep();
      if (index !== -1) {
        setActiveStep(index);
      }
    }
  };

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) {
      return false;
    }
    const index = steps.findIndex(step => !step.completed);
    if (index === -1) {
      return false;
    }
    return true;
  };

  const findUnfinishedStep = () => {
    return steps.findIndex(step => !step.completed);
  };
  // Checking if images are present and step is completed
  useEffect(() => {
    if(images.length) {
      if(!steps[2].completed) { // if step 3 is not completed
        setComplete(2, true); // set step 3 to completed
      }
    } else {
      if(steps[2].completed) { // if step 3 is completed
        setComplete(2, false); // set step 3 to not completed
      }
    }
  }, [images]);

  const setComplete = (index, status) => {
    setSteps(steps => {
      steps[index].completed = status;
      return [...steps]
    });
  };
  
  return (
    <div>
      <Container sx={{my: 4}}>
        <Stepper
          sx={{mb: 4}}
          activeStep={activeStep}
          alternativeLabel
          nonLinear
        >
          {steps.map((step, index) => (
            <Step key={step.label} completed={step.completed}>
              <StepButton onClick={()=>setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {/* Switch for event components */}
        <Box sx={{mb: 4}}>
          {{
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImage />,
            3: <AddPayment />,
            4: <ReviewEvent />
          }[activeStep]
          }
        </Box>
        <Stack
          direction='row'
          sx={{pt: 2, pb: 7, justifyContent: 'space-around'}}
        >
          <Button color='inherit'
            disabled={!activeStep}
            onClick={()=>setActiveStep(activeStep-1)}
          >
            Back
          </Button>

          <Button color='inherit'
            disabled={checkDisabled()}
            // onClick={()=>setActiveStep(activeStep+1)}
            onClick={handleNext}
          >
            {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
            Next
            
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default AddEvent;