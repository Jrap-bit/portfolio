declare module 'rss' {
    interface FeedOptions {
      title: string;
      description?: string;
      feed_url?: string;
      site_url?: string;
      image_url?: string;
      docs?: string;
      managingEditor?: string;
      webMaster?: string;
      copyright?: string;
      language?: string;
      categories?: string[];
      pubDate?: string;
      ttl?: number;
      custom_namespaces?: Record<string, string>;
      custom_elements?: any[];
    }
  
    interface ItemOptions {
      title: string;
      description?: string;
      url: string;
      guid?: string;
      categories?: string[];
      author?: string;
      date?: Date;
      lat?: number;
      long?: number;
      enclosure?: {
        url: string;
        file?: string;
        size?: number;
        type?: string;
      };
      custom_elements?: any[];
    }
  
    export default class RSS {
      constructor(options: FeedOptions);
      item(options: ItemOptions): void;
      xml(options?: { indent?: boolean }): string;
    }
  }