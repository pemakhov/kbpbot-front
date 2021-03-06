import React, { useState, useEffect } from 'react';
import withLayout from '../../hoc/withLayout';
import { PHONES, BIRTHDAYS, USERS } from '../../constants/dataTypes';
import { API_URL } from '../../constants/url';
import DataTypeSwitchInput from './DataTypeSwitchInput';
import DataTable from './DataTable';
import { fetchProtectedData, getBearerToken } from '../../service/authentication';
import './Home.css';

const Home = () => {
  const [dataType, setDataType] = useState(PHONES);
  const [data, setData] = useState({ type: PHONES, source: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEditingId, setIsEditingId] = useState('');

  const edit = (id) => setIsEditingId(id);

  const cancelEditing = (resetValues) => {
    resetValues();
    setIsEditingId(() => '');
  };

  const submitEditing = async (saveData) => {
    await saveData();
    setIsEditingId(() => '');
  };

  const loadData = async (type) => {
    try {
      setIsLoading(() => true);

      const res = await fetch(`${API_URL}/${type}`);
      const apiData = await res.json();

      setData(() => ({ type, source: apiData }));
      setIsLoading(() => false);
    } catch (error) {
      setApiError(error.message);
    }
  };

  const onDataTypeChange = (event) => {
    const newType = event.target.value;
    setDataType(() => newType);
  };

  const deleteItemById = (id, type) => {
    const deleteItem = async () => {
      const res = await fetch(`${API_URL}/${type}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: getBearerToken(),
        },
        body: JSON.stringify({ id }),
      });

      const { error, deleted } = await res.json();

      if (error) {
        throw new Error(error);
      }

      if (deleted > 0) {
        loadData(dataType);
      }
    };

    try {
      fetchProtectedData(deleteItem);
    } catch (error) {
      setApiError(() => error.message);
    }
  };

  useEffect(() => {
    setApiError(() => null);
    setIsEditingId(() => '');
    loadData(dataType);
  }, [dataType]);

  return (
    <div className="home d-flex flex-column">
      <div
        id="data-type-switch"
        className="btn-group mx-auto"
        role="group"
        onChange={(event) => onDataTypeChange(event)}
      >
        <DataTypeSwitchInput dataType={PHONES} currentDataType={dataType} />
        <DataTypeSwitchInput dataType={BIRTHDAYS} currentDataType={dataType} />
        <DataTypeSwitchInput dataType={USERS} currentDataType={dataType} />
      </div>
      {isLoading &&
        (
          <div className="spinner-border mx-auto mb-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      {apiError &&
        (
          <div className="apiError text-center text-danger">{apiError}</div>
        )}
      <DataTable
        data={data}
        setData={setData}
        deleteItemById={deleteItemById}
        isEditingId={isEditingId}
        edit={edit}
        cancelEditing={cancelEditing}
        submitEditing={submitEditing}
        setApiError={setApiError}
      />
    </div>
  );
};

export default withLayout(Home);
