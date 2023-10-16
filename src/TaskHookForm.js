import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, reset },
  } = useForm({
    defaultValues: {
      people: [],
    },
    mode: "onChange",
  });

  const descriptionValidation = (value) => {
    if (value.length < 10) {
      return "Task açıklaması en az 10 karakter olmalı";
    }
  };

  const onFormSubmit = (formData, e) => {
    console.log(formData);
    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });

    toast.success("Yeni task eklendi", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    e.target.reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Task başlığı girmelisiniz",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        <div className="input-error"> {errors.title?.message} </div>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            validate: { descriptionValidation },
          })}
        ></textarea>
        <div className="input-error"> {errors.description?.message} </div>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçiniz",
                  validate: (arr) =>
                    arr.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <div className="input-error"> {errors.people?.message} </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
