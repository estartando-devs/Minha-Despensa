import React, { useState, useEffect } from "react";
import { Success } from "../../components/success/success";
import { Quantity } from "../input-quant/input-quant";
import { Input } from "../input/input"
import { DropDownAb } from "../../components/dropdown/drop-down";
import { Calendar } from "../../components/calendar/calendar";
import { AddPhoto } from "../addPhoto/addPhoto"
import { Checkbox } from "../../components/checkbox/checkbox";
import { Button } from "../../../../components/Button/Button";
import { Link } from "react-router-dom";
import {storage} from '../../../../auth/config'
import {useCount} from  '../../../../context/count'
// import firebaseDb from "../../../../auth/config"

export function FormItens(props) {
  const initialFieldValues = {
    imageSrc: "",
    name: "",
    quantity: 0,
    status:"",
    expirationDate: "",
    unit:"",
    category:"",
  };
  const options = [
    { value: "pct" },
    { value: "kg" },
    { value: "g" },
    { value: "cx" },
  ];
  const categorias = [
    { value: "Limpeza" },
    { value: "Mercearia" },
    { value: "Perfumaria" },
  ];

  const [modal] = useState({ display: "none" });
  const [values, setValues] = useState(initialFieldValues);
  const {currentId} = useCount()
  const {productsObjects} = useCount()
  const [img, setImg] = useState()

  useEffect(()=> {
    if(currentId === "")
    setValues({
      ...initialFieldValues,
    })
    else
    setValues({
      ...productsObjects[currentId]
    })
  },[productsObjects,currentId]); //eslint-disable-line

  function handleChange(name, value) {
    
    if (value !== undefined) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  }
  
  const onChange = async (e) =>  {
    const file = e.target.files[0];
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file).then(()=> {
      console.log("update")
    })
    await fileRef.getDownloadURL().then((url)=> {
       values.imageSrc = url
       setImg(url)
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.currentItem(values)
  };



  return (
    <>
     <Success style={modal} text="Item adicionado com sucesso!" />
      <form onSubmit={handleFormSubmit}>
        <Input
          title="Nome"
          placeholder="Informe o nome do item"
          name="name"
          value={values.name}
          onChange={({ target }) => handleChange(target.name, target.value)}
        />
        <div className="quant-drop">
          <Quantity
            name="quantity"
            value={values.quantity}
            onChange={({ target }) => handleChange(target.name, target.value)}
          />

          <DropDownAb
            name="unit"
            className="w190"
            arrowWidth="arrow190"
            title="Unidades de medida"
            placeholder="Escolha uma unidade"
            onChange={({ value }) => handleChange("unit", value)}
            options={options}
          />
        </div>

        <div className="Calendar-DropDownAb">
          <Calendar
            name="expirationDate"
            value={values.expirationDate}
            onChange={({ target }) => handleChange(target.name, target.value)}
          />
          <DropDownAb
            name="category"
            className="w328"
            arrowWidth="arrow328"
            title="Categoria"
            placeholder="Escolha uma categoria"
            options={categorias}
            onChange={({ value }) => handleChange("category", value)}
          />
        </div>

        <div className="AddPhoto-Checkbox">
          <AddPhoto 
            name="imageSrc"
            onChange={onChange}
            src={currentId === "" ? img : values.imageSrc}
          
          />
          <Checkbox
            name="status"
            onChange={({ target }) => handleChange(target.name, target.value)}
          />
        </div>

        <div className="container-button">
          <Link to="/despensa">
            <Button
              value="Cancelar"
              style={{
                background: "#B24947",
                margin: "0 16px 0 0",
              }}
            />
          </Link>

          <Button
            type="submit"
            value="Salvar"
            style={{ background: "#437056" }}
          />
        </div>
      </form>
    </>
  );
}
