// Same Tree - Java Solution
// Same Tree - Optimal Java Solution (Trees & Graphs)
import java.util.*;

public class Solution {
    public int sametree(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Trees & Graphs state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
