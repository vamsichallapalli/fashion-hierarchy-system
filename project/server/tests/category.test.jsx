import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Category from '../models/Category.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Category.deleteMany({});
});

describe('Category Model Test', () => {
  it('should create & save category successfully', async () => {
    const validCategory = new Category({
      name: 'Women',
      parent_id: null
    });
    const savedCategory = await validCategory.save();
    
    expect(savedCategory._id).toBeDefined();
    expect(savedCategory.name).toBe('Women');
    expect(savedCategory.parent_id).toBeNull();
  });

  it('should fail to save category without required name field', async () => {
    const categoryWithoutName = new Category({
      parent_id: null
    });

    let err;
    try {
      await categoryWithoutName.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should create category with parent_id', async () => {
    // Create parent category first
    const parentCategory = new Category({
      name: 'Women',
      parent_id: null
    });
    const savedParent = await parentCategory.save();

    // Create child category
    const childCategory = new Category({
      name: 'Clothing',
      parent_id: savedParent._id
    });
    const savedChild = await childCategory.save();

    expect(savedChild._id).toBeDefined();
    expect(savedChild.name).toBe('Clothing');
    expect(savedChild.parent_id).toEqual(savedParent._id);
  });

  it('should create category with timestamps', async () => {
    const category = new Category({
      name: 'Men',
      parent_id: null
    });
    const savedCategory = await category.save();

    expect(savedCategory.createdAt).toBeDefined();
    expect(savedCategory.createdAt).toBeInstanceOf(Date);
    expect(savedCategory.updatedAt).toBeDefined();
    expect(savedCategory.updatedAt).toBeInstanceOf(Date);
  });

  it('should update category and modify updatedAt timestamp', async () => {
    const category = new Category({
      name: 'Women',
      parent_id: null
    });
    const savedCategory = await category.save();
    
    // Store the original timestamps
    const originalUpdatedAt = savedCategory.updatedAt.getTime();
    
    // Wait for 1ms to ensure timestamp will be different
    await new Promise(resolve => setTimeout(resolve, 1));
    
    savedCategory.name = 'Women\'s Fashion';
    const updatedCategory = await savedCategory.save();

    expect(updatedCategory.name).toBe('Women\'s Fashion');
    expect(updatedCategory.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt);
  });
});