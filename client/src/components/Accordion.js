import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '50.33%',
        flexShrink: 0,
        color: theme.palette.text.primary
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary
    },
}));

export default function ControlledAccordions({ id, text, summary }) {
    const classes = useStyles();
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion style={{ backgroundColor: theme.palette.background.paper }} variant="outlined" square={true} expanded={expanded === `${id}`} onChange={handleChange(`${id}`)}>
            <AccordionSummary
                expandIcon={<ControlPointIcon style={{ color: theme.palette.text.icon }} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{text}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography style={{ color: theme.palette.text.secondary }}>
                    {summary}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}