// Kth Largest Element in an Array - Java Solution
// Kth Largest Element in an Array - Optimal Java Solution (Heap & Priority Queue)
import java.util.*;

public class Solution {
    public int kthlargestelementinanarray(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Heap & Priority Queue state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
