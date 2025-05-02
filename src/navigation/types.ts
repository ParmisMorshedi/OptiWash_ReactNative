//Type.ts

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Bil: undefined;
  Tvättschema: undefined;
  Organisationer: undefined;
};


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  OrganizationDetails: {
    id: number;
    name: string;
    carPlateNumbers: string[];
  };
};

  
export type CarsStackParamList = {
  CarsList: { updated?: boolean }; 
  AddCar: undefined;
  EditCar: { carId: number };
  AddWashRecord: { carId: number };
  EditWashRecord: { washRecordId: number };

};


  
  export type WashStackParamList = {
    WashRecords: undefined;
    AddWashRecord: { carId?: number };
    EditWashRecord: { washRecordId: number };
    DeleteWashRecord: { carId: number; plateNumber: string };

  };
  export type OrganizationStackParamList  = {
    Organizations: undefined;
    OrganizationDetails: {
      id: number;
      name: string;
      carPlateNumbers: string[];
    };
    EditOrganization: { orgId: number }; 
  };


  