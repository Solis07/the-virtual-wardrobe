export const getSavedClothesIds = () => {
    // Retrieve the value stored in localStorage under the key 'saved_clothes'
    const savedClothesIds = localStorage.getItem('saved_clothes')
      ? JSON.parse(localStorage.getItem('saved_clothes'))
      // If the value doesn't exist, set an empty array
      : [];
  
    return savedClothesIds;
  };
  
  export const saveClothesIds = (clotheIdArr) => {
    if (clotheIdArr.length) {
      localStorage.setItem('saved_clothes', JSON.stringify(clotheIdArr));
    } else {
      localStorage.removeItem('saved_clothes');
    }
  };
  
  export const removeClothesId = (clothesId) => {
    const savedClothesIds = localStorage.getItem('saved_clothes')
      ? JSON.parse(localStorage.getItem('saved_clothes'))
      : null;
  
    if (!savedClothesIds) {
      return false;
    }
  
    const updatedSavedClothesIds = savedClothesIds?.filter((savedClothesId) => savedClothesId !== clothesId);
    localStorage.setItem('saved_clothes', JSON.stringify(updatedSavedClothesIds));
  
    return true;
  };
  