export const getSavedPetIds = () => {
  const savedPetIds = localStorage.getItem('saved_pets')
    ? JSON.parse(localStorage.getItem('saved_pets'))
    : [];

  return savedPetIds;
};

export const savePetId = (petIdArr) => {
  if (petIdArr.length) {
    localStorage.setItem('saved_pets', JSON.stringify(petIdArr));
  } else {
    localStorage.removeItem('saved_pets');
  }
};

export const removePetId = (petId) => {
  const savedPetIds = localStorage.getItem('saved_pets')
    ? JSON.parse(localStorage.getItem('saved_pets'))
    : null;

  if (!savedPetIds) {
    return false;
  }

  const updatedSavedPetIds = savedPetIds?.filter((savedPetId) => savedPetId !== petId);
  localStorage.setItem('saved_pets', JSON.stringify(updatedSavedPetIds));

  return true;
};


export const getSavedDogIds = () => {
  const savedDogIds = localStorage.getItem('saved_dogs')
    ? JSON.parse(localStorage.getItem('saved_dogs'))
    : [];

  return savedDogIds;
};


export const saveDogIds = (dogIdArr) => {
  if (dogIdArr.length) {
    localStorage.setItem('saved_dogs', JSON.stringify(dogIdArr));
  } else {
    localStorage.removeItem('saved_dogs');
  }
};

export const removeDogId = (dogId) => {
  const savedDogIds = localStorage.getItem('saved_dogs')
    ? JSON.parse(localStorage.getItem('saved_dogs'))
    : null;

  if (!savedDogIds) {
    return false;
  }

  const updatedSavedDogIds = savedDogIds?.filter((savedDogId) => savedDogId !== dogId);
  localStorage.setItem('saved_dogs', JSON.stringify(updatedSavedDogIds));

  return true;
};
