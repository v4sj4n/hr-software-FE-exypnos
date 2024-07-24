import  { useState } from "react";
import { Box, TextField, Chip, MenuItem } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { autoCompleteStyles } from "../../Styles";
import { InputProps } from "../Interface";

interface ChipData {
  key: number;
  label: string;
}

export const MuiSelect: React.FC<InputProps> = () => {
    const [chipData, setChipData] = useState<ChipData[]>([]);

    const handleDelete = (chipToDelete: ChipData) => () => {
      setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleChange = (event: SelectChangeEvent<string[]>) => {
      const value = event.target.value;
      const newValue = typeof value === 'string' ? value.split(',') : value;
      
      setChipData((prevChips) => {
        const newChips = newValue
          .filter((label) => !prevChips.some((chip) => chip.label === label))
          .map((label) => ({ key: Date.now() + Math.random(), label }));
        
        return [...prevChips, ...newChips];
      });
    };

    const technologies = ['Angular', 'jQuery', 'Polymer', 'React', 'Vue.js'];

    return (
        <Box width='620px'>
            <TextField 
                sx={{
                    ...autoCompleteStyles
                }} 
                variant="filled" 
                SelectProps={{ 
                  multiple: true,
                  renderValue: (selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {chipData.map((data) => (
                        <Chip
                        sx={{fontFamily: '"Outfit", sans-serif', fontSize:"14px"}}
                          key={data.key}
                          label={data.label}
                          onDelete={handleDelete(data)}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                        />
                      ))}
                    </Box>
                  ),
                }}
                fullWidth 
                label='Used technologies' 
                size="small" 
                select 
                value={chipData.map(chip => chip.label)}
                onChange={handleChange}
                InputLabelProps={{
                    style: { 
                      color: "#4C556B", 
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: "12px", 
                    },
                }}
            > 
                {technologies.map((tech) => (
                  <MenuItem sx={{fontFamily: '"Outfit", sans-serif'}} key={tech} value={tech}>
                    {tech}
                  </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}


// import { Stack, Autocomplete, TextField } from "@mui/material";
// import React, { useState } from "react";

// const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']

//  export const MuiSelect = () => {
//     const [value, setValue] = useState<string | null>(null);


//     return (
//         <Stack spacing={2} width='300px'>
//             <Autocomplete
//                 options={skills}
//                 renderInput={(params) => <TextField {...params} label="Skills" variant="filled" />}
//                 value={value}
//                 onChange={(event: any, newValue:string | null) => setValue(newValue)}
//                 freeSolo
//             />
//         </Stack>
//     )
// }