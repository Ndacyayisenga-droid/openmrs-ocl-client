import React, { useState } from 'react'
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme, Typography
} from '@material-ui/core'
import { addCIELConceptsToCollectionAction } from './redux'
import { useLocation } from 'react-router'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      textAlign: "center",
      marginTop: "2vh"
    }
  })
);

interface Props {
  addConceptsToCollection: Function,
}

const AddBulkConceptsPage: React.FC<Props> = ({addConceptsToCollection}) => {
  const classes = useStyles();
  const { pathname: url } = useLocation();
  const collectionUrl = url.replace('/add', '');
  const [conceptsToAdd, setConceptsToAdd] = useState<string[]>([]);

  return (
    <Grid item xs={6}>
      <Typography align='center'>
        Please provide IDs for the CIEL concepts to add. IDs should be separated with a space, comma or new lines.
        For example, you can copy and paste from a spreadsheet column.
        e.g 1000, 1001, 1002.
      </Typography>
      <br/>
      <TextField onChange={e => setConceptsToAdd(e.target.value.split(/[\s,\r\n]+/))} fullWidth multiline rows={20} variant="outlined" />
      <br />
      <div className={classes.buttonWrapper}>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          disabled={conceptsToAdd.length < 1}
          onClick={() => {
            setConceptsToAdd([]);
            addConceptsToCollection(collectionUrl, conceptsToAdd, true);
          }}
        >
          Add concepts
        </Button>
      </div>
    </Grid>
  );
};

const mapActionsToProps = {
  addConceptsToCollection: addCIELConceptsToCollectionAction,
}

export default connect(undefined, mapActionsToProps)(AddBulkConceptsPage);
