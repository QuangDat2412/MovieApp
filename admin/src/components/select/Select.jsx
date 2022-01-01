import { memo } from 'react';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const Select = ({ name, defaultValue, onChange, label, options }) => {
    return (
        <Grid item sm={6}>
            <FormControl component="fieldset">
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup row defaultValue={defaultValue} name={name} onChange={onChange}>
                    {Object.keys(options).map((option) => {
                        return <FormControlLabel value={options[option]} control={<Radio />} label={option} key={option} />;
                    })}
                </RadioGroup>
            </FormControl>
        </Grid>
    );
};

export default memo(Select);
