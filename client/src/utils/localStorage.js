export const getSavedClotheIds = () => {
    // Retrieve the value stored in localStorage under the key 'saved_clothes'
    const savedClotheIds = localStorage.getItem('saved_clothes')
      ? JSON.parse(localStorage.getItem('saved_clothes'))
      // If the value doesn't exist, set an empty array
      : [];
  
    return savedClotheIds;
  };
  
  export const saveClotheIds = (clotheIdArr) => {
    if (clotheIdArr.length) {
      localStorage.setItem('saved_clothes', JSON.stringify(clotheIdArr));
    } else {
      localStorage.removeItem('saved_clothes');
    }
  };
  
  export const removeClotheId = (clotheId) => {
    const savedClotheIds = localStorage.getItem('saved_clothes')
      ? JSON.parse(localStorage.getItem('saved_clothes'))
      : null;
  
    if (!savedClotheIds) {
      return false;
    }
  
    const updatedSavedClotheIds = savedClotheIds?.filter((savedClotheId) => savedClotheId !== clotheId);
    localStorage.setItem('saved_clothes', JSON.stringify(updatedSavedClotheIds));
  
    return true;
  };
  