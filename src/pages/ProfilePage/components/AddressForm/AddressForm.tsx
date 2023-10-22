import React from "react";
import s from "../ProfileForm/ProfileForm.module.scss";
const AddressForm = ({
  addressFields,
  formik,
  handleAddressChange,
  addressChain,
}) => (
  <div className={s.addressChain}>
    <h3>Изменить адрес</h3>

    <div className={s.formItem}>
      <label htmlFor="address">Субъект РФ</label>
      <select
        id="address"
        name="address"
        onChange={(e) => {
          const selectedObjectId = e.target.value;
          formik.handleChange(e);
          handleAddressChange(selectedObjectId, 0);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.address || ""}
      >
        <option value="" label="Регион"></option>
        {addressFields.map((field, index) => (
          <option key={index} value={field.objectId}>
            {field.text}
          </option>
        ))}
      </select>
      {formik.touched.address && formik.errors.address ? (
        <div>{formik.errors.address}</div>
      ) : null}
    </div>

    {addressChain.map((chain, chainIndex) => (
      <div key={chainIndex} className={s.formItem}>
        <label htmlFor={`level${chainIndex}`}>
          {chain[0]?.objectLevelText}
        </label>
        {chain.length > 0 && (
          <select
            id={`level${chainIndex}`}
            name={`level${chainIndex}`}
            onChange={(e) => {
              const selectedObjectId = e.target.value;
              formik.handleChange(e);
              handleAddressChange(selectedObjectId, chainIndex);
            }}
            onBlur={formik.handleBlur}
            value={formik.values[`level${chainIndex}`] || ""}
          >
            {chainIndex === addressChain.length - 1 ? (
              <option value="" label=""></option>
            ) : null}
            {chain.map((field, index) => (
              <option key={index} value={field.objectId}>
                {field.text}
              </option>
            ))}
          </select>
        )}
      </div>
    ))}
  </div>
);
export default AddressForm;
