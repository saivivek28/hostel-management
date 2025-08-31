import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ApiImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {
  private readonly UNSPLASH_ACCESS_KEY = 'demo'; // Replace with actual key
  private readonly PEXELS_API_KEY = 'demo'; // Replace with actual key
  
  // Fallback images in case API fails
  private fallbackImages: ApiImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&auto=format',
      title: 'Gourmet Breakfast',
      description: 'Start your day with our nutritious breakfast options',
      category: 'breakfast'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format',
      title: 'Fresh Lunch',
      description: 'Healthy and delicious lunch prepared daily',
      category: 'lunch'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop&auto=format',
      title: 'Dinner Special',
      description: 'End your day with our special dinner menu',
      category: 'dinner'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format',
      title: 'Dining Hall',
      description: 'Spacious and comfortable dining environment',
      category: 'hall'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format',
      title: 'Kitchen',
      description: 'Clean and modern kitchen facilities',
      category: 'kitchen'
    }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Fetch images from multiple APIs with fallback support
   */
  getMessImages(): Observable<ApiImage[]> {
    // For demo purposes, we'll use a combination of curated Unsplash URLs
    // and fallback to local images if needed
    return this.getCuratedImages().pipe(
      catchError(() => {
        console.warn('API failed, using fallback images');
        return of(this.fallbackImages);
      })
    );
  }

  /**
   * Get curated images from various food categories
   */
  private getCuratedImages(): Observable<ApiImage[]> {
    const curatedImages: ApiImage[] = [
      // Breakfast Images
      {
        id: 1,
        src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop&auto=format',
        title: 'Continental Breakfast',
        description: 'Fresh pastries, fruits, and coffee to start your day',
        category: 'breakfast'
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop&auto=format',
        title: 'Eggs Benedict',
        description: 'Classic eggs benedict with hollandaise sauce',
        category: 'breakfast'
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop&auto=format',
        title: 'Fruit Parfait',
        description: 'Layered yogurt parfait with fresh fruits and granola',
        category: 'breakfast'
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
        title: 'Breakfast Burrito',
        description: 'Hearty breakfast burrito with eggs, cheese, and vegetables',
        category: 'breakfast'
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=600&fit=crop&auto=format',
        title: 'Pancake Stack',
        description: 'Fluffy pancakes with maple syrup and fresh berries',
        category: 'breakfast'
      },

      // Lunch Images
      {
        id: 6,
        src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&auto=format',
        title: 'Healthy Buddha Bowl',
        description: 'Nutritious buddha bowl with quinoa, vegetables, and protein',
        category: 'lunch'
      },
      {
        id: 7,
        src: 'https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=800&h=600&fit=crop&auto=format',
        title: 'Grilled Chicken Salad',
        description: 'Fresh garden salad topped with grilled chicken breast',
        category: 'lunch'
      },
      {
        id: 8,
        src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format',
        title: 'Artisan Pizza',
        description: 'Freshly baked pizza with premium toppings',
        category: 'lunch'
      },
      {
        id: 9,
        src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=600&fit=crop&auto=format',
        title: 'Wrap & Smoothie',
        description: 'Healthy wrap served with fresh fruit smoothie',
        category: 'lunch'
      },
      {
        id: 10,
        src: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&auto=format',
        title: 'Sandwich Combo',
        description: 'Gourmet sandwich with side salad and chips',
        category: 'lunch'
      },

      // Dinner Images
      {
        id: 11,
        src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&auto=format',
        title: 'Steak Dinner',
        description: 'Perfectly cooked steak with roasted vegetables',
        category: 'dinner'
      },
      {
        id: 12,
        src: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop&auto=format',
        title: 'Fish & Chips',
        description: 'Classic fish and chips with tartar sauce',
        category: 'dinner'
      },
      {
        id: 13,
        src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop&auto=format',
        title: 'Vegetarian Feast',
        description: 'Colorful vegetarian dinner with seasonal vegetables',
        category: 'dinner'
      },
      {
        id: 14,
        src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop&auto=format',
        title: 'Comfort Food',
        description: 'Hearty comfort food perfect for dinner',
        category: 'dinner'
      },
      {
        id: 15,
        src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&auto=format',
        title: 'Pasta Night',
        description: 'Fresh pasta with homemade sauce and herbs',
        category: 'dinner'
      },

      // Dining Hall Images
      {
        id: 16,
        src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format',
        title: 'Evening Dining',
        description: 'Elegant evening dining atmosphere with warm lighting',
        category: 'hall'
      },
      {
        id: 17,
        src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format',
        title: 'Group Dining',
        description: 'Students enjoying meals together in communal space',
        category: 'hall'
      },
      {
        id: 18,
        src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format',
        title: 'Modern Dining Space',
        description: 'Contemporary dining hall with comfortable seating',
        category: 'hall'
      },
      {
        id: 19,
        src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop&auto=format',
        title: 'Cafeteria Style',
        description: 'Self-service cafeteria with variety of options',
        category: 'hall'
      },

      // Kitchen Images
      {
        id: 20,
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format',
        title: 'Chef at Work',
        description: 'Professional chef preparing fresh meals',
        category: 'kitchen'
      },
      {
        id: 21,
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
        title: 'Fresh Ingredients',
        description: 'Daily fresh ingredients sourced for quality meals',
        category: 'kitchen'
      },
      {
        id: 22,
        src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&auto=format',
        title: 'Cooking Station',
        description: 'Multiple cooking stations for efficient meal preparation',
        category: 'kitchen'
      },
      {
        id: 23,
        src: 'https://images.unsplash.com/photo-1556909114-4f6e9d4d4d4d?w=800&h=600&fit=crop&auto=format',
        title: 'Food Preparation',
        description: 'Fresh ingredients being prepared in our clean kitchen',
        category: 'kitchen'
      }
    ];

    return of(curatedImages);
  }

  /**
   * Fetch images by category
   */
  getImagesByCategory(category: string): Observable<ApiImage[]> {
    return this.getMessImages().pipe(
      map(images => images.filter(img => img.category === category))
    );
  }

  /**
   * Get random images for variety
   */
  getRandomImages(count: number = 10): Observable<ApiImage[]> {
    return this.getMessImages().pipe(
      map(images => {
        const shuffled = [...images].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      })
    );
  }
}
