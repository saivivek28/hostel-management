import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageApiService, ApiImage } from '../../shared/services/image-api.service';

interface MessImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'hall' | 'kitchen';
}

@Component({
  selector: 'app-mess-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mess-gallery.component.html',
  styleUrls: ['./mess-gallery.component.css']
})
export class MessGalleryComponent implements OnInit {
  constructor(private imageApiService: ImageApiService) {}

  images: MessImage[] = [
    // Breakfast Images
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop&auto=format',
      title: 'Breakfast Spread',
      description: 'Fresh and nutritious breakfast options including cereals, fruits, and hot meals',
      category: 'breakfast'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format',
      title: 'Continental Breakfast',
      description: 'Continental breakfast with bread, pastries, and beverages',
      category: 'breakfast'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=600&fit=crop&auto=format',
      title: 'Pancake Stack',
      description: 'Fluffy pancakes with fresh berries and maple syrup',
      category: 'breakfast'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop&auto=format',
      title: 'Healthy Breakfast Bowl',
      description: 'Nutritious breakfast bowl with fruits, nuts, and yogurt',
      category: 'breakfast'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop&auto=format',
      title: 'Fresh Toast & Coffee',
      description: 'Artisan toast with avocado and freshly brewed coffee',
      category: 'breakfast'
    },

    // Lunch Images
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&auto=format',
      title: 'Lunch Buffet',
      description: 'Variety of lunch options with regional and international cuisines',
      category: 'lunch'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format',
      title: 'Healthy Salad Bar',
      description: 'Fresh salads and healthy meal choices available daily',
      category: 'lunch'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&auto=format',
      title: 'Gourmet Sandwich',
      description: 'Freshly made sandwiches with premium ingredients',
      category: 'lunch'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop&auto=format',
      title: 'Asian Cuisine',
      description: 'Authentic Asian dishes prepared with traditional recipes',
      category: 'lunch'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop&auto=format',
      title: 'Mediterranean Bowl',
      description: 'Mediterranean-style bowl with fresh vegetables and grains',
      category: 'lunch'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop&auto=format',
      title: 'Soup & Bread',
      description: 'Hearty soups served with freshly baked bread',
      category: 'lunch'
    },

    // Dinner Images
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop&auto=format',
      title: 'Dinner Delights',
      description: 'Wholesome dinner meals prepared with fresh ingredients',
      category: 'dinner'
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&auto=format',
      title: 'Grilled Specialties',
      description: 'Perfectly grilled meats and vegetables for dinner',
      category: 'dinner'
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop&auto=format',
      title: 'Pasta Night',
      description: 'Italian pasta dishes with homemade sauces',
      category: 'dinner'
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop&auto=format',
      title: 'Curry & Rice',
      description: 'Traditional curry dishes served with steamed rice',
      category: 'dinner'
    },
    {
      id: 16,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format',
      title: 'Roasted Chicken',
      description: 'Herb-roasted chicken with seasonal vegetables',
      category: 'dinner'
    },
    {
      id: 17,
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&auto=format',
      title: 'Seafood Platter',
      description: 'Fresh seafood prepared with Mediterranean flavors',
      category: 'dinner'
    },

    // Dining Hall Images
    {
      id: 18,
      src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop&auto=format',
      title: 'Main Dining Hall',
      description: 'Spacious dining area with comfortable seating for all residents',
      category: 'hall'
    },
    {
      id: 19,
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format',
      title: 'Dining Experience',
      description: 'Comfortable dining environment for students and residents',
      category: 'hall'
    },
    {
      id: 20,
      src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop&auto=format',
      title: 'Modern Cafeteria',
      description: 'Contemporary cafeteria design with natural lighting',
      category: 'hall'
    },
    {
      id: 21,
      src: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop&auto=format',
      title: 'Community Dining',
      description: 'Large community dining space for group meals',
      category: 'hall'
    },
    {
      id: 22,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format',
      title: 'Outdoor Seating',
      description: 'Beautiful outdoor dining area with garden views',
      category: 'hall'
    },

    // Kitchen Images
    {
      id: 23,
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format',
      title: 'Modern Kitchen',
      description: 'State-of-the-art kitchen facilities ensuring hygiene and quality',
      category: 'kitchen'
    },
    {
      id: 24,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
      title: 'Professional Cooking',
      description: 'Professional chefs preparing meals with precision',
      category: 'kitchen'
    },
    {
      id: 25,
      src: 'https://images.unsplash.com/photo-1556909114-4f6e9d4d4d4d?w=800&h=600&fit=crop&auto=format',
      title: 'Food Preparation',
      description: 'Fresh ingredients being prepared in our clean kitchen',
      category: 'kitchen'
    },
    {
      id: 26,
      src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&auto=format',
      title: 'Cooking Station',
      description: 'Multiple cooking stations for efficient meal preparation',
      category: 'kitchen'
    },
    {
      id: 27,
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format',
      title: 'Kitchen Equipment',
      description: 'Modern kitchen equipment for quality food preparation',
      category: 'kitchen'
    },

    // Additional Breakfast Images
    {
      id: 28,
      src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&h=600&fit=crop&auto=format',
      title: 'Eggs Benedict',
      description: 'Classic eggs benedict with hollandaise sauce',
      category: 'breakfast'
    },
    {
      id: 29,
      src: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop&auto=format',
      title: 'Fruit Parfait',
      description: 'Layered yogurt parfait with fresh fruits and granola',
      category: 'breakfast'
    },
    {
      id: 30,
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
      title: 'Breakfast Burrito',
      description: 'Hearty breakfast burrito with eggs, cheese, and vegetables',
      category: 'breakfast'
    },

    // Additional Lunch Images
    {
      id: 31,
      src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&auto=format',
      title: 'Healthy Buddha Bowl',
      description: 'Nutritious buddha bowl with quinoa, vegetables, and protein',
      category: 'lunch'
    },
    {
      id: 32,
      src: 'https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=800&h=600&fit=crop&auto=format',
      title: 'Grilled Chicken Salad',
      description: 'Fresh garden salad topped with grilled chicken breast',
      category: 'lunch'
    },
    {
      id: 33,
      src: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=600&fit=crop&auto=format',
      title: 'Wrap & Smoothie',
      description: 'Healthy wrap served with fresh fruit smoothie',
      category: 'lunch'
    },
    {
      id: 34,
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&auto=format',
      title: 'Pizza Slice',
      description: 'Freshly baked pizza with premium toppings',
      category: 'lunch'
    },

    // Additional Dinner Images
    {
      id: 35,
      src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&auto=format',
      title: 'Steak Dinner',
      description: 'Perfectly cooked steak with roasted vegetables',
      category: 'dinner'
    },
    {
      id: 36,
      src: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop&auto=format',
      title: 'Fish & Chips',
      description: 'Classic fish and chips with tartar sauce',
      category: 'dinner'
    },
    {
      id: 37,
      src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop&auto=format',
      title: 'Vegetarian Feast',
      description: 'Colorful vegetarian dinner with seasonal vegetables',
      category: 'dinner'
    },
    {
      id: 38,
      src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop&auto=format',
      title: 'Comfort Food',
      description: 'Hearty comfort food perfect for dinner',
      category: 'dinner'
    },

    // Additional Hall Images
    {
      id: 39,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format',
      title: 'Evening Dining',
      description: 'Elegant evening dining atmosphere with warm lighting',
      category: 'hall'
    },
    {
      id: 40,
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format',
      title: 'Group Dining',
      description: 'Students enjoying meals together in communal space',
      category: 'hall'
    },

    // Additional Kitchen Images
    {
      id: 41,
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format',
      title: 'Chef at Work',
      description: 'Professional chef preparing fresh meals',
      category: 'kitchen'
    },
    {
      id: 42,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
      title: 'Fresh Ingredients',
      description: 'Daily fresh ingredients sourced for quality meals',
      category: 'kitchen'
    }
  ];

  selectedImage: MessImage | null = null;
  filteredImages: MessImage[] = [];
  activeFilter: string = 'all';
  isLoading: boolean = false;
  imageLoadErrors: Set<number> = new Set();

  ngOnInit(): void {
    this.loadImages();
  }

  private loadImages(): void {
    this.isLoading = true;
    this.imageApiService.getMessImages().subscribe({
      next: (apiImages) => {
        // Convert API images to MessImage format
        this.images = apiImages.map(img => ({
          id: img.id,
          src: img.src,
          title: img.title,
          description: img.description,
          category: img.category as 'breakfast' | 'lunch' | 'dinner' | 'hall' | 'kitchen'
        }));
        this.filteredImages = this.images;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load images from API:', error);
        // Keep existing hardcoded images as fallback
        this.filteredImages = this.images;
        this.isLoading = false;
      }
    });
  }

  onImageError(imageId: number): void {
    this.imageLoadErrors.add(imageId);
  }

  onImageLoad(imageId: number): void {
    this.imageLoadErrors.delete(imageId);
  }

  isImageError(imageId: number): boolean {
    return this.imageLoadErrors.has(imageId);
  }

  getImageCount(category?: string): number {
    if (!category || category === 'all') {
      return this.images.length;
    }
    return this.images.filter(img => img.category === category).length;
  }

  filterImages(category: string): void {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredImages = this.images;
    } else {
      this.filteredImages = this.images.filter(img => img.category === category);
    }
  }

  openLightbox(image: MessImage): void {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeLightbox(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  nextImage(): void {
    if (!this.selectedImage) return;
    
    const currentIndex = this.filteredImages.findIndex(img => img.id === this.selectedImage!.id);
    const nextIndex = (currentIndex + 1) % this.filteredImages.length;
    this.selectedImage = this.filteredImages[nextIndex];
  }

  previousImage(): void {
    if (!this.selectedImage) return;
    
    const currentIndex = this.filteredImages.findIndex(img => img.id === this.selectedImage!.id);
    const prevIndex = currentIndex === 0 ? this.filteredImages.length - 1 : currentIndex - 1;
    this.selectedImage = this.filteredImages[prevIndex];
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.selectedImage) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
    }
  }

  trackByImageId(index: number, image: MessImage): number {
    return image.id;
  }
}
