//Type.ts

export type RootStackParamList = {
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

  