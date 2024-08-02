import Button from "@/Components/Button/Button";
import { ButtonTypes } from "@/Components/Button/ButtonTypes";
import AxiosInstance from "@/Helpers/Axios";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect, FormEvent } from "react";

interface UpdateAssetProps {
  type: string;
  id: string;
  user?: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

export const UpdateAssetForm: React.FC<UpdateAssetProps> = ({
  id,
  type,
  user,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<User[]>([]);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!isOpen) {
      return undefined;
    }

    setAutocompleteLoading(true);
    (async () => {
      if (active) {
        const { data } = await AxiosInstance.get<User[]>("/user");
        setOptions(data);
      }
      setAutocompleteLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [isOpen]);

  const [userId, setUserId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(id, userId);
      const res = await AxiosInstance.patch(`asset/${id}`, {
        userId: userId,
        status: "assigned",
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Update Asset</h2>
      <form onSubmit={handleSubmit}>
        <h3>{type}</h3>

        <Autocomplete
          id="users-list"
          sx={{ width: 300 }}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onChange={(event, newValue) => {
            event.preventDefault();
            console.log(newValue);
            if (newValue) {
              setUserId(newValue?._id);
            }
          }}
          options={options}
          loading={autocompleteLoading}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.firstName + " " + option.lastName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Assign to User"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {autocompleteLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Button btnText={"Update"} type={ButtonTypes.PRIMARY} isSubmit />
      </form>
    </div>
  );
};
