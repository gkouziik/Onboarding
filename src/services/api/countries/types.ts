/**
 * Raw country object returned from api
 */
export interface Country {
  uuid: string;
  population: number;
  region: string;

  names: {
    common: string;
    official: string;

    alternates?: string[];
    native?: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
    translations?: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
  };

  capitals: {
    name: string;

    attributes?: {
      administrative?: boolean;
      constitutional?: boolean;
      executive?: boolean;
      judicial?: boolean;
      legislative?: boolean;
      primary?: boolean;
    };

    coordinates?: {
      lat: number;
      lng: number;
    };
  }[];

  area: {
    kilometers: number;
    miles?: number;
  };

  flag: {
    description?: string;
    emoji: string;
    url_png: string;
    url_svg: string;

    html_entity?: string;
    unicode?: string;
  };

  codes?: {
    alpha_2?: string;
    alpha_3?: string;
    ccn3?: string;
    cioc?: string;
    fifa?: string;
    fips?: string;
    gec?: string;
  };

  subregion?: string;

  assets?: unknown[];

  borders?: string[];

  calling_codes?: string[];

  cars?: {
    driving_side?: 'left' | 'right';
    signs?: string[];
  };

  classification?: {
    dependency?: boolean;
    dependency_type?: string;
    disputed?: boolean;
    iso_status?: string;
    sovereign?: boolean;
    un_member?: boolean;
    un_observer?: boolean;
  };

  continents?: string[];

  coordinates?: {
    lat: number;
    lng: number;
  };

  currencies?: {
    code: string;
    name: string;
    symbol?: string;
  }[];

  date?: {
    academic_year_start?: {
      day: number;
      month: number;
    };

    fiscal_year_start?: {
      corporate?: {
        basis?: string;
        day: number;
        month: number;
      };

      government?: {
        day: number;
        month: number;
      };

      personal?: {
        day: number;
        month: number;
      };
    };

    start_of_week?: string;
  };

  demonyms?: Record<
    string,
    {
      f: string;
      m: string;
    }
  >;

  economy?: {
    gini_coefficient?: Record<string, number>;
  };

  government_type?: string;

  landlocked?: boolean;

  languages?: {
    bcp47?: string;
    iso639_1?: string;
    iso639_2b?: string;
    iso639_2t?: string;
    iso639_3?: string;
    name: string;
    native_name?: string;
  }[];

  leaders?: unknown[];

  links?: {
    google_maps?: string;
    official?: string;
    open_street_maps?: string;
    wikipedia?: string;
  };

  memberships?: {
    african_union?: boolean;
    arab_league?: boolean;
    asean?: boolean;
    brics?: boolean;
    commonwealth?: boolean;
    eu?: boolean;
    eurozone?: boolean;
    g20?: boolean;
    g7?: boolean;
    nato?: boolean;
    oecd?: boolean;
    opec?: boolean;
    schengen?: boolean;
    un?: boolean;
  };

  number_format?: {
    decimal_separator?: string;
    thousands_separator?: string;
  };

  parent?: {
    alpha_2?: string;
    alpha_3?: string;
  };

  postal_code?: {
    format?: string;
    regex?: string;
  };

  timezones?: string[];

  tlds?: string[];

  _meta?: {
    lastUpdatedTimestamp?: number;
  };
}

/**
 * Wraps List response
 */
export type ListMeta = {
  total: number;
  count: number;
  limit: number;
  offset: number;
  more: boolean;
  request_id?: string;
};

export type ListResponse<T> = {
  data: {
    objects: T[];
    meta: ListMeta;
  };
};
