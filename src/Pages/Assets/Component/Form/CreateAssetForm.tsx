import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { AxiosError } from "axios";
import { AssetsContext } from "../../AssetsContext";
import AxiosInstance from "@/Helpers/Axios";
import Button from "@/Components/Button/Button";
import { ButtonTypes } from "@/Components/Button/ButtonTypes";
import Input from "@/Components/Input/Index";
import { ErrorText } from "@/Components/Error/ErrorTextForm";

const assetSchema = z.object({
  type: z.enum(["laptop", "monitor"], {
    message: "Asset should be either a laptop or a monitor",
  }),
  serialNumber: z.string().min(10, {
    message: "Serial Number should be at least 10 characters long",
  }),
});

type FormFields = z.infer<typeof assetSchema>;

export const CreateAssetForm = () => {
  const { setAssets, handleCloseModal } = useContext(AssetsContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(assetSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await AxiosInstance.post("/asset", data);
      console.log("Asset created successfully:", res.data);
      if (res.status === 201) {
        setAssets((prevAssets) => [...prevAssets, res.data]);
        handleCloseModal();
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("root", {
          message: err?.response?.data?.message,
        });
      } else {
        setError("root", {
          message: "An error occurred while creating the asset",
        });
      }
    }
  };

  return (
    <>
      <h3>Create an asset</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1.5rem",
        }}
      >
        <div>
          <select
            {...register("type")}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          >
            <option value="" disabled selected>
              Select an item
            </option>
            <option value="laptop">Laptop</option>
            <option value="monitor">Monitor</option>
          </select>
          {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
        </div>

        <div>
          <Input
            IsUsername
            name="serialNumber"
            width={"100%"}
            label="Serial Number"
            register={register("serialNumber")}
          />
          {errors.serialNumber && (
            <ErrorText>{errors.serialNumber.message}</ErrorText>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.3rem" }}>
          <Button
            type={ButtonTypes.PRIMARY}
            btnText={isSubmitting ? "Submitting" : "Submit"}
            width={"100%"}
            isSubmit
          />
          <Button
            type={ButtonTypes.SECONDARY}
            btnText="Cancel"
            onClick={handleCloseModal}
            width={"100%"}
          />
        </div>

        {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
      </form>
    </>
  );
};
