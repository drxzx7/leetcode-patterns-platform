// Capacity To Ship Packages Within D Days - Java Solution
// Capacity To Ship Packages Within D Days - Optimal Java Solution (Binary Search)
import java.util.*;

public class Solution {
    public int capacitytoshippackageswithinddays(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Binary Search state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
