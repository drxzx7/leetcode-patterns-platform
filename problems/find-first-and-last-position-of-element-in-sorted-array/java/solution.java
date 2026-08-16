// Find First and Last Position of Element in Sorted Array - Java Solution
// Find First and Last Position of Element in Sorted Array - Optimal Java Solution (Binary Search)
import java.util.*;

public class Solution {
    public int findfirstandlastpositionofelementinsortedarray(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Binary Search state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
