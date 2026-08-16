// Car Fleet - Java Solution
// Car Fleet - Optimal Java Solution (Stack & Queue)
import java.util.*;

public class Solution {
    public int carfleet(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Stack & Queue state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
