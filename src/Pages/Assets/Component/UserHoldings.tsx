import { useContext, useCallback, useState, useEffect, FormEvent } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Autocomplete, Card, CircularProgress, TextField } from "@mui/material";
import { AssetsContext } from "../AssetsContext";
import { useFetch } from "@/Hooks/useFetch";
import { Asset, UserWithAsset } from "../TAsset";
import style from "../style/userHolding.module.scss";
import dayjs from "dayjs";
import AxiosInstance from "@/Helpers/Axios";
import { inputStyles } from "@/Components/Input/Styles";
import Button from "@/Components/Button/Button";
import { ButtonTypes } from "@/Components/Button/ButtonTypes";

const modStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export const UserHoldings = () => {
  const { searchParams, setSearchParams } = useContext(AssetsContext);

  const { data, loading, error } = useFetch<UserWithAsset>(
    `asset/user/${searchParams.get("selected")}`,
  );
  console.log(data);

  const handleClose = useCallback(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("selected");
      return newParams;
    });
  }, [setSearchParams]);

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Asset[]>([]);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [assetId, setAssetId] = useState<string | null>(null);

  const handleItemReturn = async (
    e: FormEvent<HTMLFormElement>,
    assetId: string,
  ) => {
    e.preventDefault();
    const payload = {
      userId: null,
      return: new Date().toISOString(),
    };
    const res = await AxiosInstance.patch(`/asset/${assetId}`, payload);
    if ([200, 201].includes(res.status)) {
      handleClose();
    } else {
      alert("Something went wrong");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!assetId) return;
    const payload = {
      userId: searchParams.get("selected"),
      receive: new Date().toISOString(),
    };
    const res = await AxiosInstance.patch(`/asset/${assetId}`, payload);
    if ([200, 201].includes(res.status)) {
      handleClose();
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    let active = true;

    if (!isOpen) {
      return undefined;
    }

    setAutocompleteLoading(true);
    (async () => {
      if (active) {
        const { data } = await AxiosInstance.get<Asset[]>(
          "/asset?availability=available",
        );
        setOptions(data);
      }
      setAutocompleteLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [isOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Card sx={modStyle}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className={style.mainContainer} style={{}}>
              <img
                src={data?.imageUrl}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt=""
              />
              <h3>
                {data?.firstName} {data?.lastName}
              </h3>
              <p>
                Holding {data?.assets.length} item
                {data?.assets.length === 1 ? "" : "s"}{" "}
              </p>

              <div className={style.simpleBio}>
                <p>{data?.email}</p>
                <p>{data?.phone}</p>
                <p>{data?.role}</p>
              </div>
              <hr />
              <div className={style.assetsContainer}>
                {data?.assets.map((asset) => {
                  return (
                    <div
                      key={asset._id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className={style.itemDetails}>
                        <h4>
                          {asset.type[0].toUpperCase() + asset.type.slice(1)}
                        </h4>
                        <p>{asset.serialNumber}</p>
                      </div>
                      <div className={style.dateContainer}>
                        <p
                          style={{
                            margin: 0,
                          }}
                        >
                          Taken on:{" "}
                          {dayjs(asset?.receive).format("DD-MMM-YYYY")}{" "}
                        </p>
                        <form
                          onSubmit={(e) => {
                            handleItemReturn(e, asset._id);
                          }}
                        >
                          <Button
                            btnText={"Return"}
                            isSubmit
                            type={ButtonTypes.PRIMARY}
                          />
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form onSubmit={handleSubmit} className={style.formInput}>
                <Autocomplete
                  id="users-list"
                  sx={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                  open={isOpen}
                  onOpen={() => setIsOpen(true)}
                  onClose={() => setIsOpen(false)}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    console.log(newValue);
                    if (newValue) {
                      setAssetId(newValue?._id);
                    }
                  }}
                  options={options}
                  loading={autocompleteLoading}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  getOptionLabel={(option) =>
                    option.type + " " + option.serialNumber
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign to User"
                      variant="filled"
                      size="small"
                      sx={{ ...inputStyles }}
                      InputLabelProps={{
                        style: {
                          color: "#4C556B",
                          fontFamily: '"Outfit", sans-serif',
                        },
                        shrink: true,
                      }}
                      InputProps={{
                        disableUnderline: true,
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
                <Button
                  btnText={"Assign"}
                  isSubmit
                  type={ButtonTypes.PRIMARY}
                />
              </form>
            </div>
          )}
        </Card>
      </Fade>
    </Modal>
  );
};
