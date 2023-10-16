import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const PeopleForm = ({ kisiler, submitFn }) => {
  const [isim, setIsim] = useState("");
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      people: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (kisiler.includes(isim)) {
      setError("Bu isim daha önce eklenmiş");
    } else {
      setError(null);
    }
  }, [isim, kisiler]);

  // bunu validate: olarak yap

  // function handleIsimChange(e) {
  //   setIsim(e.target.value);
  // }

  function handlePeopleSubmit(e) {
    submitFn(e.title);
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(handlePeopleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Bu isim daha önce eklenmiş",
            validate: (kisi) =>
              !kisiler.includes(kisi) || "Bu isim daha önce eklenmiş",
          })}
          type="text"
          // onChange={handleIsimChange}
          // value={isim}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          // disabled={isim.length === 0 || error}
          disabled={!isValid}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
