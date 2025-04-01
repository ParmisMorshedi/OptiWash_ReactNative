export type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    OrganizationDetails: {
      id: number;
      name: string;
      carPlateNumbers: string[];
    };
  };
  